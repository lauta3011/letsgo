---
name: Portfolio Component Boundaries
description: Use when adding or refactoring a portfolio component, choosing file locations, or deciding whether to change labels or wire components together
---

## Purpose

Respect this repo's scope rules when creating or changing components.

## Workflow

1. Put every new component at `src/components/[component_name]/[component_name].tsx`.
2. Do not add new libraries or dependencies.
3. Do not add, remove, rename, or rewrite user-visible labels or text unless the user explicitly asks for that change.
4. Do not import or wire a newly created component into other components unless the user explicitly asks. Creating the component is the whole task.
5. When a refactor is requested, change only the requested component(s) and leave unrelated files untouched.
6. Report exactly which files were created or modified, and confirm that no unrequested labels, wiring, or dependencies were introduced.

## Checklist

- [ ] New component follows `src/components/[component_name]/[component_name].tsx`.
- [ ] No new dependency.
- [ ] No unrequested label or text change.
- [ ] No unrequested cross-component wiring.
