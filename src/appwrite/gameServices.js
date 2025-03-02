import conf from "../conf/conf";
import { Client, Databases } from "appwrite";

export class gameServices {

    client = new Client();
    database;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    async getGame(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getGame :: error", error);
            return false
        }
    }

    async getGames() {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            )
            return response;
        } catch (error) {
            console.error("Appwrite service :: getGames :: error", error);
            return { documents: [] }; // Return empty array to prevent errors
        }
    }

}

const appwriteGameService = new gameServices();
export default appwriteGameService;