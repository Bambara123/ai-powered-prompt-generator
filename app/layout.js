import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

// For SEO 
export const metadata = {
  title: 'PromptCraft',
  description: 'Generate and Share prompts with your collegues',
}

// this used to wrap all other components.



export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        
        <div className='main'>
          <div className='gradient'></div>

        </div>
       
        <main className='app'> <Nav/>{children}</main>
      </body>
    </html>
  )
}
