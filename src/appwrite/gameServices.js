import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

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
            return false
        }
    }

    async getGames() {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                //  Query.orderDesc("$createdAt"),
                 Query.limit(1000000)
                ]
            )
            return response;
        } catch (error) {            
            return { documents: [] };
        }
    }

}

const appwriteGameService = new gameServices();
export default appwriteGameService;