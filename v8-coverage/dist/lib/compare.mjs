/**
 * Compares two script coverages.
 *
 * The result corresponds to the comparison of their `url` value (alphabetical sort).
 */
export function compareScriptCovs(a, b) {
    if (a.url === b.url) {
        return 0;
    }
    else if (a.url < b.url) {
        return -1;
    }
    else {
        return 1;
    }
}
/**
 * Compares two function coverages.
 *
 * The result corresponds to the comparison of the root ranges.
 */
export function compareFunctionCovs(a, b) {
    return compareRangeCovs(a.ranges[0], b.ranges[0]);
}
/**
 * Compares two range coverages.
 *
 * The ranges are first ordered by ascending `startOffset` and then by
 * descending `endOffset`.
 * This corresponds to a pre-order tree traversal.
 */
export function compareRangeCovs(a, b) {
    if (a.startOffset !== b.startOffset) {
        return a.startOffset - b.startOffset;
    }
    else {
        return b.endOffset - a.endOffset;
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9zcmMvY29tcGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLENBQXNCLEVBQUUsQ0FBc0I7SUFDOUUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFDbkIsT0FBTyxDQUFDLENBQUM7S0FDVjtTQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtTQUFNO1FBQ0wsT0FBTyxDQUFDLENBQUM7S0FDVjtBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQXdCLEVBQUUsQ0FBd0I7SUFDcEYsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLENBQXFCLEVBQUUsQ0FBcUI7SUFDM0UsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFDbkMsT0FBTyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7S0FDdEM7U0FBTTtRQUNMLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyIsImZpbGUiOiJjb21wYXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db3YsIFJhbmdlQ292LCBTY3JpcHRDb3YgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqIENvbXBhcmVzIHR3byBzY3JpcHQgY292ZXJhZ2VzLlxuICpcbiAqIFRoZSByZXN1bHQgY29ycmVzcG9uZHMgdG8gdGhlIGNvbXBhcmlzb24gb2YgdGhlaXIgYHVybGAgdmFsdWUgKGFscGhhYmV0aWNhbCBzb3J0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVTY3JpcHRDb3ZzKGE6IFJlYWRvbmx5PFNjcmlwdENvdj4sIGI6IFJlYWRvbmx5PFNjcmlwdENvdj4pOiBudW1iZXIge1xuICBpZiAoYS51cmwgPT09IGIudXJsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSBpZiAoYS51cmwgPCBiLnVybCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMTtcbiAgfVxufVxuXG4vKipcbiAqIENvbXBhcmVzIHR3byBmdW5jdGlvbiBjb3ZlcmFnZXMuXG4gKlxuICogVGhlIHJlc3VsdCBjb3JyZXNwb25kcyB0byB0aGUgY29tcGFyaXNvbiBvZiB0aGUgcm9vdCByYW5nZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlRnVuY3Rpb25Db3ZzKGE6IFJlYWRvbmx5PEZ1bmN0aW9uQ292PiwgYjogUmVhZG9ubHk8RnVuY3Rpb25Db3Y+KTogbnVtYmVyIHtcbiAgcmV0dXJuIGNvbXBhcmVSYW5nZUNvdnMoYS5yYW5nZXNbMF0sIGIucmFuZ2VzWzBdKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0d28gcmFuZ2UgY292ZXJhZ2VzLlxuICpcbiAqIFRoZSByYW5nZXMgYXJlIGZpcnN0IG9yZGVyZWQgYnkgYXNjZW5kaW5nIGBzdGFydE9mZnNldGAgYW5kIHRoZW4gYnlcbiAqIGRlc2NlbmRpbmcgYGVuZE9mZnNldGAuXG4gKiBUaGlzIGNvcnJlc3BvbmRzIHRvIGEgcHJlLW9yZGVyIHRyZWUgdHJhdmVyc2FsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVJhbmdlQ292cyhhOiBSZWFkb25seTxSYW5nZUNvdj4sIGI6IFJlYWRvbmx5PFJhbmdlQ292Pik6IG51bWJlciB7XG4gIGlmIChhLnN0YXJ0T2Zmc2V0ICE9PSBiLnN0YXJ0T2Zmc2V0KSB7XG4gICAgcmV0dXJuIGEuc3RhcnRPZmZzZXQgLSBiLnN0YXJ0T2Zmc2V0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiLmVuZE9mZnNldCAtIGEuZW5kT2Zmc2V0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
