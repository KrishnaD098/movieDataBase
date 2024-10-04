import FileDBAdapter from "@supergrowthai/next-blog/adapters/FileDBAdapter"


const page = async () => {
    const blogProvider = new FileDBAdapter("dataPath/")
    const blogs = await blogProvider.blogs.find({})
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export default page
