# Project-type checks

Read the block that matches what the change touches, and record the others as not applicable. These checks add to the dimensions in `SKILL.md`; they do not replace them.

## Website feature checks

Apply these only when the change touches the named feature. For a change with no website UI, skip the whole block and record it as not applicable.

- **Search, menus, and copy buttons.** Check site search returns real permitted results, the mobile menu closes and restores interaction state correctly, back-to-top controls reach the intended navigation context, and copy buttons report success only after copying the intended value. Check failures and unsupported capabilities as well as the happy path.
- **Passwords, confirmations, and forms.** Verify password visibility toggles preserve the value and password-manager behavior without submitting or logging secrets; confirmation modals must perform no mutation before confirmation. Form success and error states must follow the actual result and preserve appropriate input after failure.
- **Cookie banner.** For a simple cookie banner, verify the applicable accept/reject/preferences controls change real tracking behavior, remain accessible on mobile, and allow later preference changes. A dismissible notice alone is not consent management where consent is required.
- **Skip links and expandable FAQs.** Check skip-to-content links reach the main content and move subsequent keyboard navigation past repeated navigation without being obscured by sticky headers. For expandable FAQs, verify keyboard/touch operation, accurate expanded state, accessible answers, and focus behavior.
- **Themes and scrollbars.** Verify dark mode toggle state, preference persistence, initial theme rendering, and control contrast across themes. Custom scrollbar styling must preserve usable thumb/track contrast, thickness, native scrolling, forced-colors/high-contrast behavior, and browser fallbacks.
- **Print output.** Check the print stylesheet in print preview or PDF output: readable content, sensible page breaks, static positioning where needed, intended FAQ answers and contact information, and removal of irrelevant overlays/controls. Never reveal masked passwords or intentionally protected data in print output.
- **Loading and hover effects.** Check loading animations and hover states for layout shifts, costly repeated paints, motion preferences, and keyboard/touch equivalents. Loading effects must stop on resolution and must not delay ready content or invent progress.
- **Dates, FAQs, and contact details.** Verify last updated dates reflect real substantive content changes and agree with relevant metadata, FAQ answers remain accurate when expanded, and public contact information and its links are approved and correct. A new build timestamp alone is not evidence of updated content.

## Command-line tools

- **Interface compatibility.** Check changed commands, flags, defaults, positional arguments, environment variables, config-file keys, and exit codes against existing scripts and documentation. A renamed flag or changed default breaks automation even when interactive use still works.
- **Output and streams.** Check that machine-readable output stays stable, results go to standard output and diagnostics to standard error, and behavior is sensible when not attached to a terminal: no prompts, colors, or progress bars in pipes and CI.
- **Destructive and privileged operations.** Check confirmation or dry-run for destructive actions, handling of interrupts and partial completion, permissions on created files, and safe handling of paths, globs, and arguments passed to subprocesses.
- **Platforms and installation.** Check path separators, shells, line endings, and locale assumptions on the supported operating systems, and that packaging, shell completions, and the reported version match the change.

## Libraries and packages

- **Public API.** Check exported names, signatures, types, default values, thrown errors, and behavior for compatibility with existing callers. Identify breaking changes and whether the version bump, deprecation path, and changelog match them.
- **Dependency surface.** Check added or tightened dependency and peer-dependency ranges, runtime or engine requirements, and the install-size or bundle-size effect on consumers.
- **Packaging.** Check entry points, module formats, type declarations, and the files actually published, so the change works when installed from the registry and not only from the source tree.
- **Consumer safety.** Check global state, side effects at import time, thread or async safety, and logging or network activity a host application would not expect.

## Mobile apps

- **Platform behavior.** Check permissions and their rationale prompts, lifecycle events such as backgrounding, process death, and rotation, deep links, and push-notification handling on each supported OS version.
- **Offline and upgrade paths.** Check offline and poor-network behavior, local data migrations when upgrading from older installed versions, and compatibility between old app versions and a changed backend API.
- **Device variety.** Check small and large screens, safe areas, dynamic type or font scaling, dark mode, and the platform screen readers.
- **Store and release constraints.** Check bundled secrets, privacy manifests or data-safety declarations, new SDKs, and anything that needs store review before the change can reach users. A mobile release cannot be rolled back like a server deploy.

## Infrastructure as code

- **Plan and blast radius.** Review the planned changes, not only the code: resources replaced or destroyed, data-bearing resources affected, and whether the change targets the intended environment and account.
- **Access and exposure.** Check IAM policies and roles for wildcard or over-broad permissions, public network exposure, security-group and firewall rules, public access to buckets and databases, and encryption settings.
- **State and secrets.** Check that secrets are not in code, variable files, state, or plan output, that remote state is locked and access-controlled, and that provider and module versions are pinned.
- **Rollout and recovery.** Check ordering and dependencies, downtime during replacement, drift from manual changes, deletion protection and backups for stateful resources, and how the change would be reverted. Do not apply infrastructure changes as a review check.
