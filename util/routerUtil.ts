import express from 'express';

export function generateResponse(task: any, req: express.Request, res: express.Response): void {
    const viewParam = req.query["view"]
    if (viewParam == "json") {
        res.json(task);
    } else {
        const fileName = generateFileNameFromUrl(req.originalUrl);
        res.render(fileName, { task });
    }
}

function generateFileNameFromUrl(url: string): string {
    const parts = url.split('/');
    const fileNameParts = parts
        .map(part => {
            if (part.includes('?')) { // Check for query parameter
                return part.split('?')[0];
            }
            return part;
        })
        .filter(part => part !== ''); // Remove empty parts
    
    const capitalizedParts = fileNameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalizedParts.join('');
}
