
//returns an entry form to add til entries

function Home(props) {

    return(
        <>
        <h1>Today I learned</h1>
        <form action = '/dashboard' method= "POST">
            <input name = "title" type = "text" placeholder = "Title" / >  
            <input name = "topic" type = "text"  placeholder = "Topic"/>
            <input name = "attachment" type = "url" placeholder = "Attachments" />
            <input name = "author" type = "text" placeholder = "Author"/>
            <input name = "when" type = "datetime-local"/>
            <input type = "submit" />
        </form>
        </>
    )
}

export default Home