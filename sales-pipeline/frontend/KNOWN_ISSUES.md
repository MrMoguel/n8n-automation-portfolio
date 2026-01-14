# Known Issues

## TypeScript / Linting Warnings

### Unused Variables
- **Description**: Several files contain imports or variables that are declared but not currently used (e.g., `React` import in React 18+ component, unused icons).
- **Files Affected**:
    - `src/components/ui/Modal.tsx` (`Fragment`)
    - `src/features/dashboard/Dashboard.tsx` (`React`)
    - `src/features/dashboard/KPISection.tsx` (`React`)
    - `src/features/dashboard/LeadDetail.tsx` (`React`, `Calendar`, `DollarSign`)
    - `src/features/dashboard/LeadsTable.tsx` (`React`)
- **Severity**: Low
- **Status**: Pending Cleanup
- **Workaround**: None needed, does not affect runtime. Can be cleaned up by removing the unused imports.
