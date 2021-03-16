import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden">

      <main className="p-4">
        <h1 className={styles.title}>
          Welcome ao <p className="text-blue-600">Clipping Católico!</p>
        </h1>

        <br />
        <br />
        <p className={styles.description}>
          Este projeto nasceu com o intuito de levar para os cristãos notícias católicas copiladas dos principais e dos mais confiáveis sites de notícias!

        </p>

        <div className={styles.grid}>
          <a href="/api/get-feed" className={styles.card}>
            <h3>API Clipping Católico &rarr;</h3>
            <p>Conheça mais detalhes da api open source criada para alimentar os canais deste projeto.</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Instagram  &rarr;</h3>
            <p>Acesse nosso instagram</p>
          </a>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Alexa Skill  &rarr;</h3>
            <p>Ouças as notícias em seu dispositivo Amazon com a Alexa.</p>
          </a>
          <a href="/terms" className={styles.card}>
            <h3>Termos  &rarr;</h3>
            <p>Acesse os termos de uso do serviço.</p>
          </a>
        </div>



      </main>


    </div>
  )
}
