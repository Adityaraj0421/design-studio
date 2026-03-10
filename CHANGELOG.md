# Changelog

All notable changes to Design Studio are documented here.

## [2.0.0] — 2025-03-10

The v2 release expands Design Studio from 4 commands to 16, adds 5 specialist agents, and introduces hooks, auto-detection, and a settings system.

### Added

- **12 new commands**: `/figma-create`, `/ux-audit`, `/design-handoff`, `/figma-responsive`, `/figma-sync`, `/design-present`, `/brand-kit`, `/component-docs`, `/figma-prototype`, `/site-to-figma`, `/ab-variants`, `/design-sprint`
- **5 specialist agents**: accessibility-auditor, design-qa, figma-creator, design-critique, design-lint
- **Hooks system**: SessionStart (auto-detection), PreToolUse (HTML validation), Stop (follow-up suggestions)
- **Auto-detection script**: Detects 15+ frameworks, build tools, CSS-in-JS libraries, component libraries, and documentation tools at session start
- **Settings system**: `settings.local.md` for user-configurable preferences (brand colors, framework, font, deploy target)
- **What's Next sections**: Every command now suggests relevant follow-up commands
- **Workflow pipelines**: 6 documented multi-command workflows (design-from-scratch, Figma-native, design-to-code, brand setup, stakeholder review, full sprint)
- **17 eval cases** with 6 assertions each covering all commands
- **2 new references**: `figma-creation.md` (693 lines — Figma Desktop Bridge API patterns) and `deployment.md` (198 lines — preview + Firebase hosting)

### Changed

- Expanded original 4 commands (`/design`, `/figma`, `/design-review`, `/design-system`) to match v2 quality standard
- SKILL.md rewritten with team assembly examples for all 16 commands + 10 agents
- README rebuilt with workflows section, configuration section, expanded knowledge table
- Detection script expanded from 5 to 15+ detection categories

## [1.0.0] — 2025-02-15

Initial release of Design Studio.

### Added

- **4 commands**: `/design`, `/design-review`, `/design-system`, `/figma`
- **9 specialist roles**: Design Manager, Creative Director, Product Designer, UX Designer, UI Designer, UX Researcher, Content Designer, Design System Lead, Motion Designer
- **7 reference files**: product-designer, ux-designer, ui-designer, ux-researcher, content-designer, design-system-lead, motion-designer
- **SessionStart hook** with basic project context detection
- **2 eval cases** for onboarding-redesign and pricing-table
- Plugin manifest, CONTRIBUTING.md, MIT License
