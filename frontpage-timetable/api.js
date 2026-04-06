export default {
    async fetch(request) {
        const url = new URL(request.url).searchParams.get('url');
        const response = await fetch(url);
        const text = await response.text();
        return new Response(text, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/calendar',
            }
        });
    }
}