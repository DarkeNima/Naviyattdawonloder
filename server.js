import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// TikTok Downloader API Route
app.get("/api/download", async (req, res) => {
  try {
    const videoURL = req.query.url;
    if (!videoURL) return res.json({ error: "URL required!" });

    const api = `https://api.helbus.cloud/tiktok?url=${encodeURIComponent(videoURL)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data.status) {
      return res.json({ error: "Invalid TikTok link!" });
    }

    res.json({
      status: true,
      video_no_watermark: data.video_no_watermark,
      video_watermark: data.video_watermark,
      audio: data.audio,
      thumbnail: data.thumbnail,
      author: data.author
    });
  } catch (e) {
    res.json({ error: "Server error!" });
  }
});

// Run server
app.listen(3000, () => console.log("Server running on port 3000"));
