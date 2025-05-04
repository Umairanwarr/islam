import { storage, BUCKET_ID, client } from '../appwrite';

/**
 * Securely download a file from Appwrite storage
 * @param {string} fileId - The ID of the file to download
 * @param {string} fileName - The name to save the file as
 * @returns {Promise<void>}
 */
export const secureDownloadFile = async (fileId, fileName) => {
  try {
    if (!fileId) {
      throw new Error('No file ID provided');
    }

    // Create a download URL with the Appwrite SDK
    // This is a more secure approach as it doesn't expose the URL in the HTML
    // and uses the SDK's authentication
    const downloadUrl = storage.getFileDownload(BUCKET_ID, fileId);

    // Fetch the file directly using the browser's fetch API
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    // Get the file as a blob
    const blob = await response.blob();

    // Create a blob URL for the file
    const blobUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = fileName || 'download';

    // Append to the document, click it, and remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Clean up the blob URL
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 100);

    return true;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

/**
 * Securely open a PDF file in a new tab from Appwrite storage
 * @param {string} fileId - The ID of the file to open
 * @returns {Promise<void>}
 */
export const secureOpenPdfInNewTab = async (fileId) => {
  try {
    if (!fileId) {
      throw new Error('No file ID provided');
    }

    // Create a download URL with the Appwrite SDK
    const downloadUrl = storage.getFileDownload(BUCKET_ID, fileId);

    // Fetch the file directly using the browser's fetch API
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the file as a blob
    const blob = await response.blob();

    // Create a blob URL for the file
    const blobUrl = URL.createObjectURL(blob);

    // Open the blob URL in a new tab
    window.open(blobUrl, '_blank');

    // Clean up the blob URL after a longer timeout to ensure the tab has time to load
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 30000); // 30 seconds should be enough for most PDFs to load

    return true;
  } catch (error) {
    console.error('Error opening PDF:', error);
    throw error;
  }
};
