import { Router } from 'express'
import { processImage } from './image.processor.js'

const router = Router()

/**
 * GET /api/image?url=<encodedImageUrl>
 * Returns the processed image as WebP.
 * The URL must be an HTTPS URL (SSRF guard).
 */
router.get('/', async (req, res) => {
    const { url } = req.query

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing required query param: url' })
    }

    // SSRF guard — only allow https:// URLs
    let parsed
    try {
        parsed = new URL(url)
    } catch {
        return res.status(400).json({ error: 'Invalid image URL' })
    }
    if (parsed.protocol !== 'https:') {
        return res.status(400).json({ error: 'Image URL must use HTTPS' })
    }

    try {
        const processed = await processImage(url)
        res
            .set('Content-Type', 'image/webp')
            .set('Cache-Control', 'public, max-age=31536000, immutable')
            .send(processed)
    } catch {
        res.status(500).json({ error: 'Failed to process image' })
    }
})

export default router
