import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class resultServices {

    client = new Client();
    datadase;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.datadase = new Databases(this.client);
    }

    async getResult(gameName) {
        try {
            const response = await this.datadase.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteResultCollectionId,
                [Query.equal('gamename', gameName)]
            )
            return response.documents.length > 0 ? response.documents[0] : null;
        } catch (error) {
            console.error("Error fetching single result:", error);
        }
    }

    async getResults() {
        try {
            const response = await this.datadase.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteResultCollectionId,
                [Query.orderDesc("$createdAt")]
            )
            return response
        } catch (error) {
            console.error("Error fetching results:", error);
            return { documents: [] }; // Return empty array to avoid errors
        }
    }

}

const appwriteResultService = new resultServices();
export default appwriteResultService;