export default async function handler(req, res) {
    // 1. Get the version the ESP32 is currently running
    // The ESP32 will call: /api/check-update?ver=2.1.0
    const currentVersion = req.query.ver;

    // 2. CONFIGURATION: Manually update these 3 lines for every new release
    const LATEST_VERSION = "2.2.0"; 
    const S3_BASE_URL = "https://esp32--firmware.s3.amazonaws.com"; 
    const BIN_FILE = "firmware_v2_2_0.bin";

    if (!currentVersion) {
        return res.status(400).json({ error: "Missing version query parameter" });
    }

    // 3. Compare Version strings
    if (currentVersion !== LATEST_VERSION) {
        // Logic: Device needs an update
        return res.status(200).json({
            update: true,
            new_version: LATEST_VERSION,
            url: `${S3_BASE_URL}/${BIN_FILE}`
        });
    }

    // 4. Logic: Device is already up to date
    return res.status(200).json({
        update: false,
        message: "Already on latest version"
    });
}