# String Manipulation Library - Research & Knowledge Base

## Project Overview
- **Repository**: https://github.com/mboros1/string_manip.git
- **Type**: High-performance C library with SIMD optimizations
- **Key Innovation**: Two-pointer string representation (start/end) instead of null-terminated

## Architecture Insights

### Core Design Patterns
1. **Two-Pointer Strings**: 
   ```c
   typedef union faf_string {
       struct { char *start, *end; };
       simde__m128i m128i;
   } faf_string;
   ```
   - O(1) length calculation
   - Better SIMD alignment
   - No null terminator dependency

2. **Header/Implementation Separation**:
   - Each function gets own .c/.h pair
   - Consistent naming: `faf_string_[function].c/h`
   - Clear complexity documentation in headers

3. **SIMD via SIMDE**:
   - Portable SIMD using SIMDE library
   - Cross-platform compatibility
   - Fallback to scalar operations

## Performance Research Findings

### SIMD String Manipulation Best Practices

1. **ToUpper/ToLower Implementation**:
   - Use vector comparisons for range checking (A-Z/a-z)
   - Masking and conditional addition/subtraction
   - Expected performance: ~8-9x speedup over scalar
   - Key technique: `_mm_and_si128` with range masks

2. **String Trimming**:
   - Process 16 bytes at once with SSE2
   - Create whitespace mask using `_mm_cmpeq_epi8`
   - Daniel Lemire's despacer: ~14x speedup
   - Use shuffle operations to compact non-whitespace

3. **String Reverse**:
   - SSE3: `_mm_shuffle_epi8` with reverse index mask
   - AVX2: Handle 128-bit lane boundaries with permute
   - Process chunks in reverse order

4. **String Contains (Substring Search)**:
   - Hybrid Two-Way algorithm with SIMD
   - 2.7-6x speedup over naive approaches
   - Process multiple comparisons in parallel
   - Use `_mm_cmpeq_epi8` for parallel matching

5. **String Hash**:
   - SIMD parallel multiplication/XOR
   - Process multiple bytes simultaneously
   - Consider FNV-1a or xxHash patterns

6. **PDQSort Integration**:
   - Pattern-defeating quicksort for string arrays
   - O(n log n) worst case, O(n) for sorted data
   - Branchless comparisons reduce mispredictions

### Performance Guidelines
- SIMD overhead not worth it for strings <16 bytes
- Memory bandwidth often limits gains
- Start with SSE2 (universal x86-64), add AVX2 where beneficial
- Handle edge cases: page boundaries, alignment, remaining bytes

## Implementation Strategy

### For Each New Function:
1. Create header with complexity documentation
2. Implement scalar version first
3. Add SIMD optimization
4. Handle edge cases (alignment, remaining bytes)
5. Write comprehensive tests

### Testing Requirements
- Test all alignment cases (0-15 byte offsets)
- Test string lengths from 0 to >64 bytes
- Test edge cases: empty strings, single char, page boundaries
- Use faf_test framework assertions

## Code Examples Found

### ToUpper Pattern (from research):
```c
__m128i lower_bound = _mm_set1_epi8('a' - 1);
__m128i upper_bound = _mm_set1_epi8('z' + 1);
__m128i diff = _mm_set1_epi8('a' - 'A');

// For each 16-byte chunk:
__m128i is_lower = _mm_cmpgt_epi8(chunk, lower_bound);
__m128i is_upper = _mm_cmplt_epi8(chunk, upper_bound);
__m128i mask = _mm_and_si128(is_lower, is_upper);
__m128i adjustment = _mm_and_si128(mask, diff);
__m128i result = _mm_sub_epi8(chunk, adjustment);
```

### Trim Pattern (simplified):
```c
__m128i spaces = _mm_set1_epi8(' ');
__m128i tabs = _mm_set1_epi8('\t');
__m128i newlines = _mm_set1_epi8('\n');
__m128i returns = _mm_set1_epi8('\r');

// Create whitespace mask
__m128i mask = _mm_or_si128(
    _mm_cmpeq_epi8(chunk, spaces),
    _mm_or_si128(
        _mm_cmpeq_epi8(chunk, tabs),
        _mm_or_si128(
            _mm_cmpeq_epi8(chunk, newlines),
            _mm_cmpeq_epi8(chunk, returns)
        )
    )
);
```

## Project-Specific Context

### Build System
- Uses Make with pattern rules
- Test executables: `test_faf_string_*.c`
- All tests run with: `make all_tests`
- No external dependencies except SIMDE

### Testing Framework (faf_test)
```c
FAF_ASSERT(condition, "message");
FAF_ASSERT_EQ(expected, actual, "message");
// Custom assertions for string comparison
```

### Common Patterns in Codebase
1. Early return for edge cases
2. Alignment handling before SIMD loops
3. Scalar fallback for remaining bytes
4. Consistent error handling

## Orchestration Lessons Learned

1. **Single Worker Appropriate**: All string functions are tightly coupled, share patterns
2. **Research Phase Critical**: SIMD patterns research saved significant implementation time
3. **Domain Expertise Matters**: Understanding SIMD intrinsics essential for this project
4. **Test-Driven Helpful**: Comprehensive test cases guide implementation

## References & Resources

1. [Daniel Lemire's Blog](https://lemire.me/) - SIMD string processing
2. [Agner Fog's Optimization Manuals](https://www.agner.org/optimize/)
3. [Intel Intrinsics Guide](https://software.intel.com/sites/landingpage/IntrinsicsGuide/)
4. [SIMDE Documentation](https://github.com/simd-everywhere/simde)
5. [Two-Way String Matching Algorithm](http://monge.univ-mlv.fr/~mac/Articles-PDF/CP-1991-jacm.pdf)

## Future Considerations

1. AVX-512 support for newer processors
2. ARM NEON optimizations via SIMDE
3. GPU acceleration for massive string arrays
4. Vectorized UTF-8 handling