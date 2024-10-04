import nextBlog from "@supergrowthai/next-blog"
import FileDBProvider from "@supergrowthai/next-blog/adapters/FileDBAdapter"
   //To use a database use the builtin MongoDBProvider or create a new Provider and create a pr?:D
   //This provider only works locally.    
   const dbProvider = async () => new FileDBProvider("dataPath/")
   const {GET, POST} = nextBlog({db: dbProvider})

   export { GET, POST };