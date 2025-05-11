module.exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const values = [name, address, latitude, longitude];

        await req.db.query(query, values);

        res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
        console.error('Error in /add route:', error);
        res.status(500).json({ message: 'Failed to add school' });
    }
}

module.exports.listSchools = async (req, res) => {
    try {
        const { userLatitude, userLongitude } = req.query;
        if (!userLatitude || !userLongitude)
            return res.status(400).json({ message: 'User latitude and longitude are required' });

        const [rows] = await req.db.query(`
        SELECT id, name, address, latitude, longitude,
        (6371 * ACOS(
            COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) +
            SIN(RADIANS(?)) * SIN(RADIANS(latitude))
        )) AS distance
        FROM schools
        ORDER BY distance ASC
    `, [userLatitude, userLongitude, userLatitude]);

        return res.status(200).json(rows);
    } catch(err){
        console.error('Error in /listSchools route:', err);
        return res.status(500).json({ message: 'Failed to list schools' });
    }
}