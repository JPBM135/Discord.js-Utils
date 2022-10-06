export function convertGitHubUrlToRawUrl(url: string): string {
	return url.replace('github.com', 'raw.githubusercontent.com').replace('blob/', '');
}
