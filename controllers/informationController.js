// informationController.js
exports.getBanner = (req, res) => {
    const banner = { title: 'Welcome to Our Service', imageUrl: 'banner.jpg' };
    res.status(200).json(banner);
};

exports.getServices = (req, res) => {
    const services = [
        { name: 'Pulsa', description: 'Top up pulsa' },
        { name: 'Voucher Game', description: 'Top up voucher game' }
    ];
    res.status(200).json(services);
};