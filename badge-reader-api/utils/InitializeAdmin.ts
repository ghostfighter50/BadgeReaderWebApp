import AdminModel from '../models/badgeModel';
import adminCredentials from '../config/admin.json';

export const initializeAdmin = async () => {
  try {
    const existingAdmin = await AdminModel.findOne({ badgeId: adminCredentials.adminBadgeId });

    if (!existingAdmin) {
      const newAdmin = new AdminModel({
        badgeId: adminCredentials.adminBadgeId,
        name: 'admin',
        lastScanned: null,
        isScanned: false,
      });

      await newAdmin.save();
      console.log('[+] Admin created successfully');
    } else {
      console.log('[-] Admin already exists in the database');
    }
  } catch (error: any) {
    console.error('[X] Error initializing admin:', error.message);
  }
};
