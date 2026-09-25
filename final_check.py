from pathlib import Path
from datetime import datetime
import shutil
import subprocess
import sys
import re

ROOT = Path.cwd()
SRC = ROOT / "src"

print("\n" + "=" * 64)
print("🚀 PROJECT-0878 — AGROPULSE FINAL CHECK")
print("=" * 64)

# ------------------------------------------------------------
# 1. BACKUP
# ------------------------------------------------------------

stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup = ROOT / f"backup_final_check_{stamp}"
backup.mkdir()

if SRC.exists():
    shutil.copytree(SRC, backup / "src")

for name in [
    "README.md",
    "package.json",
    "vite.config.ts",
    "tailwind.config.cjs",
    "postcss.config.cjs",
]:
    p = ROOT / name
    if p.exists():
        shutil.copy2(p, backup / name)

print(f"✅ Backup: {backup.name}")

# ------------------------------------------------------------
# 2. DO NOT TOUCH DEPENDENCIES
# ------------------------------------------------------------

print("\n🔒 Dependency safety check")

pkg = ROOT / "package.json"
vite = ROOT / "vite.config.ts"

if pkg.exists():
    ptxt = pkg.read_text(encoding="utf-8")

    print("   package.json found")

    if "tailwindcss" in ptxt:
        print("   ✅ Tailwind dependency present")

    if "@tailwindcss/vite" in ptxt:
        print("   ⚠️ Tailwind v4 Vite plugin detected")
    else:
        print("   ✅ No @tailwindcss/vite dependency detected")

if vite.exists():
    vtxt = vite.read_text(encoding="utf-8")

    if "@tailwindcss/vite" in vtxt:
        print("   ⚠️ vite.config still imports @tailwindcss/vite")
    else:
        print("   ✅ vite.config preserves PostCSS-style setup")

# ------------------------------------------------------------
# 3. SOURCE INVENTORY
# ------------------------------------------------------------

print("\n📦 Source inventory")

required = [
    "src/components/ClimateRadar.tsx",
    "src/components/SoilTelemetry.tsx",
    "src/components/VisionPathology.tsx",
    "src/components/MandiArbitrage.tsx",
    "src/components/FarmerResilienceLoop.tsx",
    "src/components/JudgePitchDeck.tsx",
    "src/services/nasaEarthData.ts",
    "src/services/dataSync.ts",
]

missing = []

for item in required:
    p = ROOT / item
    if p.exists():
        print(f"   ✅ {item}")
    else:
        print(f"   ❌ MISSING {item}")
        missing.append(item)

if missing:
    print("\n❌ Required project files missing.")
    sys.exit(1)

# ------------------------------------------------------------
# 4. NASA DATE WINDOW AUDIT
# ------------------------------------------------------------

print("\n🌐 NASA date-window audit")

nasa_files = [
    ROOT / "src/services/nasaEarthData.ts",
    ROOT / "src/services/dataSync.ts",
]

fixed_hits = []

for p in nasa_files:
    text = p.read_text(encoding="utf-8")

    for needle in ["20240901", "20240905"]:
        if needle in text:
            fixed_hits.append(f"{p.name}: {needle}")

if fixed_hits:
    print("   ⚠️ Fixed 2024 NASA dates remain:")
    for x in fixed_hits:
        print("      ", x)
else:
    print("   ✅ No fixed 2024 NASA window detected")

# ------------------------------------------------------------
# 5. -999 AUDIT
# ------------------------------------------------------------

print("\n🚫 Sentinel-value audit")

sentinel_hits = []

for p in SRC.rglob("*"):
    if p.suffix not in [".ts", ".tsx"]:
        continue

    try:
        lines = p.read_text(encoding="utf-8").splitlines()
    except Exception:
        continue

    for i, line in enumerate(lines, 1):
        if "-999" in line:
            sentinel_hits.append(
                f"{p.relative_to(ROOT)}:{i}: {line.strip()}"
            )

if sentinel_hits:
    print(f"   ⚠️ Found {len(sentinel_hits)} raw -999 references")
    for x in sentinel_hits[:20]:
        print("      ", x)
else:
    print("   ✅ No raw -999 references")

# ------------------------------------------------------------
# 6. PROVENANCE AUDIT
# ------------------------------------------------------------

print("\n🏷️ Provenance audit")

source_text = ""

for p in SRC.rglob("*"):
    if p.suffix in [".ts", ".tsx"]:
        try:
            source_text += "\n" + p.read_text(encoding="utf-8")
        except Exception:
            pass

bad_claims = [
    "GOVT. OF INDIA E-NAM & AGMARKNET LIVE",
    "AGMARKNET LIVE",
    "LIVE AGMARKNET",
    "e-NAM LIVE",
    "LIVE CWC",
    "live CWC",
    "CWC Guwahati Gauge (Site #031)",
]

found_bad = []

for claim in bad_claims:
    if claim in source_text:
        found_bad.append(claim)

if found_bad:
    print("   ⚠️ Possible misleading labels:")
    for x in found_bad:
        print("      ", x)
else:
    print("   ✅ Targeted live-feed wording clean")

# ------------------------------------------------------------
# 7. VISION DISCLOSURE
# ------------------------------------------------------------

print("\n🦠 Vision Pathology audit")

vision = ROOT / "src/components/VisionPathology.tsx"

if vision.exists():
    text = vision.read_text(encoding="utf-8")

    if "Future Integration" in text:
        print("   ✅ Production model target is disclosed")
    else:
        print("   ⚠️ Future production-model disclosure not detected")

# ------------------------------------------------------------
# 8. JUDGE CLAIM AUDIT
# ------------------------------------------------------------

print("\n📊 Judge Pitch audit")

judge = ROOT / "src/components/JudgePitchDeck.tsx"

if judge.exists():
    text = judge.read_text(encoding="utf-8")

    checks = [
        ("140M+", "Context Benchmark"),
        ("₹35,000/hectare", "scenario"),
        ("18–72 hour", "scenario"),
    ]

    for value, label in checks:
        if value in text and label.lower() in text.lower():
            print(f"   ✅ {value} has contextual labeling")
        elif value in text:
            print(f"   ⚠️ {value} found; inspect its label")
        else:
            print(f"   ℹ️ {value} not present")

# ------------------------------------------------------------
# 9. README / DEMO / DEVPOST
# ------------------------------------------------------------

print("\n📚 Submission documentation")

docs = [
    "README.md",
    "DEMO_SCRIPT.md",
    "DEVPOST_SUBMISSION.md",
]

for name in docs:
    p = ROOT / name

    if p.exists() and p.stat().st_size > 100:
        print(f"   ✅ {name}")
    else:
        print(f"   ⚠️ {name} missing or too small")

# ------------------------------------------------------------
# 10. TYPESCRIPT LINT
# ------------------------------------------------------------

def run(cmd, title):
    print("\n" + "=" * 64)
    print(title)
    print("=" * 64)

    result = subprocess.run(
        cmd,
        cwd=ROOT,
        text=True
    )

    if result.returncode != 0:
        print(f"\n❌ FAILED: {' '.join(cmd)}")
        sys.exit(result.returncode)

    print(f"✅ {title} PASSED")


run(
    ["npm", "run", "lint"],
    "🧪 TYPESCRIPT / LINT"
)

# ------------------------------------------------------------
# 11. PRODUCTION BUILD
# ------------------------------------------------------------

run(
    ["npm", "run", "build"],
    "🏗️ PRODUCTION BUILD"
)

# ------------------------------------------------------------
# 12. BUILD ARTIFACT
# ------------------------------------------------------------

print("\n📦 Build artifact check")

dist = ROOT / "dist"

if not dist.exists():
    print("❌ dist/ missing")
    sys.exit(1)

dist_files = [
    p for p in dist.rglob("*")
    if p.is_file()
]

if not dist_files:
    print("❌ dist/ is empty")
    sys.exit(1)

print(f"   ✅ dist/ exists")
print(f"   ✅ {len(dist_files)} build files generated")

# ------------------------------------------------------------
# 13. UI INTEGRITY CHECK
# ------------------------------------------------------------

print("\n🎨 UI integrity check")

css_files = list(dist.glob("assets/*.css"))
js_files = list(dist.glob("assets/*.js"))

if css_files:
    print(f"   ✅ CSS bundle: {css_files[0].name}")
else:
    print("   ⚠️ No CSS bundle found")

if js_files:
    print(f"   ✅ JS bundle: {js_files[0].name}")
else:
    print("   ⚠️ No JS bundle found")

# ------------------------------------------------------------
# 14. GIT DIFF
# ------------------------------------------------------------

print("\n📝 Git diff summary")

subprocess.run(
    ["git", "diff", "--stat"],
    cwd=ROOT
)

# ------------------------------------------------------------
# 15. FINAL REPORT
# ------------------------------------------------------------

print("\n" + "=" * 64)
print("🎯 PROJECT-0878 FINAL REPORT")
print("=" * 64)

print("""
✅ Backup created
✅ Existing dependency setup preserved
✅ Required AgroPulse modules present
✅ NASA window audited
✅ Sentinel values audited
✅ Provenance wording audited
✅ Vision disclosure audited
✅ Judge claims audited
✅ Lint passed
✅ Production build passed
✅ dist artifact verified
""")

if fixed_hits:
    print("⚠️ NASA fixed-date references remain.")

if sentinel_hits:
    print("⚠️ Raw -999 references remain. These need manual review.")

if found_bad:
    print("⚠️ Potential live-feed wording remains.")

print("\n📌 IMPORTANT:")
print("This script intentionally does NOT redesign the UI.")
print("It does NOT reinstall Tailwind.")
print("It does NOT modify package dependencies.")
print("It validates the existing working project.")

print("\n🚀 NEXT:")
print("npm run dev -- --host 0.0.0.0")
print("Open: http://127.0.0.1:3000")

print("\n🏆 AgroPulse Project-0878 final validation finished.")
