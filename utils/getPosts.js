// The following function is shared
// with getStaticProps and API routes
// from a `util/` directory
export async function loadPosts() {
  
  // Renaming environment variables for no reason, probably
  const TRELLO_BOARD_ID = process.env.TRELLO_BOARD_ID;
  const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
  const TRELLO_KEY = process.env.TRELLO_KEY;

  // Building the API link using environment variables
  let url = 'https://api.trello.com/1/boards/' + TRELLO_BOARD_ID + '/cards?fields=due,desc,idList&attachments=true&attachment_fields=url&key=' + TRELLO_KEY + '&token=' + TRELLO_TOKEN

  // Call an external API endpoint to get posts
  const res = await fetch(url)
  const data = await res.json()

  return data
}
    
