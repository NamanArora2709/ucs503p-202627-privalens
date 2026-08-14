# PrivaLens Project Git & Pages Setup Guide

This directory contains pre-configured files to initialize your Software Engineering (UCS503) project template for **PrivaLens**.

## Step-by-Step Setup Instructions

### Step 1: Fork and Rename the Template on GitHub
1. Open your browser and navigate to the official master template repository:
   👉 [tiet-ucs503/ucs503p-202627odd-template](https://github.com/tiet-ucs503/ucs503p-202627odd-template)
2. In the top-right corner, click **Fork**.
3. Under **Repository name**, name your fork:
   `ucs503p-202627-privalens`
4. Click **Create fork**.

---

### Step 2: Clone Your Fork Locally
Open your command prompt or terminal and clone your newly forked repository:
```bash
# Replace <YOUR-GITHUB-USERNAME> with your actual GitHub username
git clone https://github.com/<YOUR-GITHUB-USERNAME>/ucs503p-202627-privalens.git
cd ucs503p-202627-privalens
```

---

### Step 3: Copy Pre-Configured Files
Copy the customized files from the `PrivaLens_Setup` folder on your system into your cloned repository directory. You should overwrite existing files when prompted:

* **MkDocs Configuration:** Copy `mkdocs.yml` to the root folder.
* **Homepage Documentation:** Copy `docs/index.md` into the `docs/` folder.
* **Student Journals:** Copy the `journals/` folder into the root folder (it contains folders for Naman, Prabhrajwin, and Ishmanjot).
* **Project Proposal LaTeX:** Copy `project-proposal/main.tex` into the `project-proposal/` folder.

---

### Step 4: Commit and Push Changes
Once files are copied, stage, commit, and push them using git:
```bash
# Check the status of modified files
git status

# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Initialize PrivaLens project settings, journals, and LaTeX proposal"

# Push to your repository
git push origin master
```
*(Note: If your default branch is `main`, use `git push origin main` instead).*

---

### Step 5: Enable GitHub Pages
Once pushed, GitHub Actions will automatically start a workflow run called `mkdocs` to build your documentation site and push it to a new branch named `gh-pages`.

1. Go to your repository on GitHub: `https://github.com/<YOUR-GITHUB-USERNAME>/ucs503p-202627-privalens`
2. Click on the **Actions** tab at the top and wait for the latest workflow run to finish successfully (turns green).
3. Go to **Settings** (top navigation bar) ➔ **Pages** (under the "Code and automation" section in the left sidebar).
4. Under **Build and deployment**:
   * **Source:** Select `Deploy from a branch`.
   * **Branch:** Select `gh-pages` and `/ (root)`.
   * Click **Save**.
5. After a few moments, your project documentation website will be live at:
   `https://<YOUR-GITHUB-USERNAME>.github.io/ucs503p-202627-privalens/`
