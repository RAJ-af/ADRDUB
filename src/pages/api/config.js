// Fetch current config
export async function GET() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/RAJ-af/ADRDUB/main/public/config.json'
    );
    const config = await response.json();
    return Response.json(config);
  } catch (error) {
    return Response.json({ error: 'Failed to load config' }, { status: 500 });
  }
}

// Update config via GitHub API
export async function POST(request) {
  try {
    const newConfig = await request.json();
    
    // Get current file SHA (required for updates)
    const fileResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/public/config.json`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    const fileData = await fileResponse.json();
    
    // Update file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/public/config.json`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update app config from admin panel',
          content: Buffer.from(JSON.stringify(newConfig, null, 2)).toString('base64'),
          sha: fileData.sha
        })
      }
    );
    
    if (updateResponse.ok) {
      // Trigger Vercel redeploy (optional)
      return Response.json({ 
        success: true, 
        message: 'Config updated! Site will redeploy in 1-2 minutes.' 
      });
    } else {
      throw new Error('GitHub update failed');
    }
    
  } catch (error) {
    return Response.json({ 
      error: error.message || 'Update failed' 
    }, { status: 500 });
  }
}
