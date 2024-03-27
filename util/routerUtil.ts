import express from 'express';

export function handleRequest(req: express.Request, res: express.Response, taskPromise: Promise<any>) {
    taskPromise
        .then(task => {
            generateResponse(task, req, res);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
}


export function generateResponse(task: any, req: express.Request, res: express.Response): void {
    const viewParam = req.query["view"]
    if (viewParam == "json") {
        res.json(task);
    } else {
        const fileName = generateFileNameFromUrl(req.originalUrl);
        console.log('file :: ' + fileName);
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
    const name = fileNameParts.map((part, index) => (index === 0 ? part.charAt(0).toLowerCase() : part.charAt(0).toUpperCase()) + part.slice(1)).join('');
    return name;
    
}
