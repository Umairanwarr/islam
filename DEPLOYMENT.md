# Deployment Instructions

This document provides instructions for deploying this React application to various hosting platforms, with a focus on ensuring proper routing for client-side navigation.

## Hostinger Deployment

When deploying to Hostinger, follow these steps to ensure proper routing:

1. Build your application:
   ```
   npm run build
   ```

2. **Option 1 (Recommended)**: Upload only the `dist` directory contents
   - Upload all files from the `dist` directory to the root of your Hostinger hosting
   - Make sure the `.htaccess` file from the `dist` directory is included in the upload

   **Option 2**: Upload the entire project
   - If you upload the entire project, make sure to place the `.htaccess` file in the root directory
   - This `.htaccess` file should redirect all routes to `dist/index.html`

3. If you're using a custom domain, configure it in your Hostinger dashboard.

4. **Fixing 404 Errors on Page Refresh**:
   If you encounter 404 errors when refreshing pages other than the landing page:

   - Make sure the correct `.htaccess` file is in the root directory of your hosting
   - The `.htaccess` file should contain rules that redirect all routes to `index.html`
   - For the current project structure, use the updated `.htaccess` files provided in this repository
   - Clear your browser cache after making changes

## Important Files for Routing

The following files have been included in this project to handle routing on different hosting platforms:

- `.htaccess` - For Apache servers (like Hostinger)
- `_redirects` - For Netlify
- `vercel.json` - For Vercel
- `web.config` - For IIS (Windows servers)
- `hostinger.conf` - Specific configuration for Hostinger

## Troubleshooting

If you still encounter routing issues:

1. **For Hostinger Specifically**:
   - Log in to your Hostinger control panel
   - Go to "Website" > "Manage" > "Advanced" > "PHP Configuration"
   - Make sure that "mod_rewrite" is enabled
   - If you're using a subdomain, make sure the `.htaccess` file is in the subdomain's root directory

2. **Check your `.htaccess` file**:
   - Make sure it contains the correct rewrite rules for your application
   - For React applications, all routes should redirect to `index.html`
   - You can use the `.htaccess` files provided in this repository as a reference

3. **Test with different approaches**:
   - Try accessing your site with and without the `www` prefix
   - Try in an incognito/private window to avoid cache issues
   - Try different browsers to rule out browser-specific issues

4. **Contact Hostinger Support**:
   - If all else fails, contact Hostinger support and mention that you're having issues with client-side routing in a React application
   - They may need to enable specific server configurations for your account

## Development vs Production

Remember that routing works differently in development and production:

- In development (`npm run dev`), Vite's dev server handles the routing
- In production, the server needs to be configured to redirect all requests to `index.html`

This is why these configuration files are necessary for production deployment.
