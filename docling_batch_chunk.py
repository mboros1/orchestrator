#!python
"""
docling_batch_chunk.py
Walks an input directory, converts every file to Docling, chunks with
max_tokens=512, peer-merge enabled, TripletTableSerializer, and writes JSON
documents (one JSON array of chunk objects per source file) to ./out/.

Now supports PDF URLs - pass a URL to download and process PDFs directly.
"""

import sys
import os
from pathlib import Path
import json
import traceback
import requests
from urllib.parse import urlparse
import tempfile
from typing import List, Union

from docling.document_converter import DocumentConverter
from docling.chunking import HybridChunker, HierarchicalChunker
from docling_core.transforms.chunker.hierarchical_chunker import (
    ChunkingSerializerProvider,
    ChunkingDocSerializer, 
    TripletTableSerializer,
    BaseDocSerializer,
)
from docling_core.types.doc.document import DoclingDocument


class TripletProvider(ChunkingSerializerProvider):
    def get_serializer(self, doc: DoclingDocument) -> BaseDocSerializer:
        return ChunkingDocSerializer(doc=doc, table_serializer=TripletTableSerializer())


def is_url(string: str) -> bool:
    """Check if string is a URL."""
    return string.startswith(('http://', 'https://'))


def download_pdf(url: str, temp_dir: Path) -> Path:
    """Download PDF from URL to temporary directory."""
    print(f"  Downloading PDF from: {url}")
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        # Extract filename from URL or use generic name
        parsed = urlparse(url)
        filename = Path(parsed.path).name
        if not filename or not filename.endswith('.pdf'):
            filename = "document.pdf"
        
        temp_file = temp_dir / filename
        temp_file.write_bytes(response.content)
        print(f"  Downloaded {len(response.content)} bytes to: {temp_file}")
        return temp_file
        
    except requests.RequestException as e:
        raise Exception(f"Failed to download PDF from {url}: {str(e)}")


def get_file_sources(input_path: str) -> List[Path]:
    """Get list of files to process from input path or URL."""
    if is_url(input_path):
        # Handle single URL
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            downloaded_file = download_pdf(input_path, temp_path)
            # Copy to persistent location since temp_dir will be cleaned up
            persistent_temp = Path("temp_downloads")
            persistent_temp.mkdir(exist_ok=True)
            persistent_file = persistent_temp / downloaded_file.name
            persistent_file.write_bytes(downloaded_file.read_bytes())
            return [persistent_file]
    else:
        # Handle local path
        in_path = Path(input_path).expanduser().resolve()
        if not in_path.exists():
            raise Exception(f"Input path '{in_path}' does not exist")
        
        if in_path.is_file():
            return [in_path]
        else:
            # Find all supported file types
            sources = []
            for pattern in ['*.md', '*.pdf', '*.txt', '*.docx', '*.pptx']:
                sources.extend(list(in_path.rglob(pattern)))
            return sources


def main():
    # Check command line arguments
    if len(sys.argv) != 2:
        print("Usage: python docling_batch_chunk.py <input_directory_or_file_or_url>")
        print("Examples:")
        print("  python docling_batch_chunk.py ./orchestrator")
        print("  python docling_batch_chunk.py https://example.com/document.pdf")
        print("  python docling_batch_chunk.py /path/to/file.pdf")
        sys.exit(1)
    
    input_str = sys.argv[1]
    print(f"Processing input: {input_str}")

    try:
        out_dir = Path("out").resolve()
        print(f"Output directory: {out_dir}")
        
        # Create output directory if it doesn't exist
        out_dir.mkdir(exist_ok=True)
        print(f"Created/verified output directory: {out_dir}")

        print("Initializing document converter...")
        converter = DocumentConverter()
        
        print("Initializing chunker...")
        chunker = HybridChunker(
            tokenizer="sentence-transformers/all-MiniLM-L6-v2",
            max_tokens=512,
            merge_peers=True,
            serializer_provider=TripletProvider(),
        )

        # Get list of files to process
        sources = get_file_sources(input_str)
        
        if is_url(input_str):
            print(f"Processing PDF from URL: {input_str}")
        elif len(sources) == 1:
            print(f"Processing single file: {sources[0]}")
        else:
            print(f"Found {len(sources)} files to process")

        if not sources:
            print("No files found to process")
            return

        processed_count = 0
        error_count = 0

        for path in sources:
            if not path.is_file():
                continue
            
            print(f"\nProcessing: {path.name}")
            try:
                # Convert document
                print(f"  Converting document...")
                conversion_result = converter.convert(str(path))
                doc = conversion_result.document
                
                # Chunk document
                print(f"  Chunking document...")
                chunks = [ck.model_dump(mode="python") for ck in chunker.chunk(doc)]
                print(f"  Generated {len(chunks)} chunks")
                
                # Write output
                out_file = out_dir / f"{path.stem}.json"
                print(f"  Writing to: {out_file}")
                with open(out_file, 'w', encoding='utf-8') as f:
                    json.dump(chunks, f, ensure_ascii=False, indent=2)
                
                processed_count += 1
                print(f"  ✓ Successfully processed {path.name}")
                
            except Exception as e:
                error_count += 1
                print(f"  ✗ Error processing {path.name}: {str(e)}")
                print(f"    {traceback.format_exc()}")
                continue

        # Clean up temporary downloads
        temp_downloads = Path("temp_downloads")
        if temp_downloads.exists() and is_url(input_str):
            print(f"\nCleaning up temporary downloads...")
            for temp_file in temp_downloads.iterdir():
                temp_file.unlink()
            temp_downloads.rmdir()

        print(f"\n=== Processing Summary ===")
        print(f"Files processed successfully: {processed_count}")
        print(f"Files with errors: {error_count}")
        print(f"Total files attempted: {processed_count + error_count}")
        
        if error_count > 0:
            print(f"\nWarning: {error_count} files had errors. Check the output above for details.")
            
    except Exception as e:
        print(f"Fatal error: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        sys.exit(1)

if __name__ == "__main__":
    main()
