Prerequisites
Git installed and configured (git --version).
Node.js (v18+) and npm installed.
Vercel CLI (npm i -g vercel).
A GitHub account and a repository (public or private).
Vercel account (free tier works fine).
1. Initialise a Git repository (if not already)
bash

# Inside your project folder (c:/Users/jsash/OneDrive/Desktop/Pratyasha)
cd "c:/Users/jsash/OneDrive/Desktop/Pratyasha"
git init
git add .
# First commit
git commit -m "Initial commit – birthday celebration site"
2. Create a GitHub repository
Go to https://github.com and New repository.
Give it a name, e.g., pratyasha-birthday.
Do NOT initialize with a README, .gitignore or license (we already have a repo).
Click Create repository.
3. Add the remote and push
bash

# Replace <USERNAME> with your GitHub username
# Replace <REPO> with the repo name you created
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git branch -M main   # set the default branch name (optional)
git push -u origin main
You may be prompted for your GitHub credentials or a personal access token.

4. Install & login to Vercel CLI
bash

npm i -g vercel   # install globally (may need sudo on Linux/macOS)
vercel login
# Follow the email link to authenticate.
5. Link the project to Vercel (first time only)
bash

vercel link
# Vercel will ask:
# • Project name – you can keep the default or type a custom one.
# • Link to existing GitHub repo – choose **Yes** and select the repo you just pushed.
Vercel will create a project on the dashboard and store a .vercel config file.

6. Deploy to Vercel (preview)
bash

vercel    # press Enter for defaults – this creates a preview URL.
Open the returned URL to verify everything works (static files, JS, assets).

7. Deploy to Production (live site)
bash

vercel --prod
Vercel will assign a production domain like your-project-name.vercel.app.

8. (Optional) Set a custom domain
If you own a domain, add it in the Vercel dashboard under Domains → Add and follow the DNS instructions.

9. Future updates
Whenever you make changes:

bash

git add .
git commit -m "Your descriptive message"
git push origin main   # push to GitHub
vercel --prod          # redeploy to production
Vercel automatically builds on each push if the repository is linked, so vercel --prod is optional for quick manual deploys.

Tip: Keep your vercel.json (if you need custom builds) at the project root. For this static site you don’t need one – Vercel’s default static file handling works.

You now have a complete command list to host the site on Vercel using GitHub. Happy deploying!