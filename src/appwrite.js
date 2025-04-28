import { Client, Storage, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('680f7c57002f9ac7662d'); // Your project ID

const storage = new Storage(client);
const BUCKET_ID = '680f87410012f15bc221';

/**
 * Upload a file to Appwrite Storage
 * @param {File} file - The file object to upload
 * @returns {Promise<Object>} - The Appwrite response
 */
const uploadFile = async (file) => {
    try {
        console.log("Starting file upload to Appwrite...");
        console.log("File details:", {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Create a unique file ID
        const fileId = ID.unique();

        // Upload the file
        const response = await storage.createFile(
            BUCKET_ID,
            fileId,
            file
        );

        console.log("File uploaded successfully:", response);
        return response;
    } catch (error) {
        console.error('Upload failed:', error);
        // Log more detailed error information
        if (error.response) {
            console.error('Error response:', error.response);
        }
        throw error;
    }
};

/**
 * Get the URL for a file
 * @param {string} fileId - The ID of the file
 * @returns {string} - The URL of the file
 */
const getFileUrl = (fileId) => {
    try {
        // Use the simplest approach - direct file view URL
        // This is the most reliable method
        console.log("Getting file URL for ID:", fileId);

        // Construct the URL manually with the project ID
        const url = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${client.config.project}`;
        console.log("Generated direct file URL:", url);

        return url;
    } catch (error) {
        console.error('Error generating URL:', error);
        return '';
    }
};

/**
 * Delete a file from Appwrite Storage
 * @param {string} fileId - The ID of the file to delete
 * @returns {Promise<void>}
 */
const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        console.log("File deleted successfully:", fileId);
    } catch (error) {
        console.error('Delete failed:', error);
        throw error;
    }
};

// List files in the bucket
const listFiles = async () => {
    try {
        const response = await storage.listFiles(BUCKET_ID);
        console.log("Files in bucket:", response);
        return response;
    } catch (error) {
        console.error('List files failed:', error);
        throw error;
    }
};

export { client, storage, ID, uploadFile, getFileUrl, deleteFile, listFiles, BUCKET_ID };