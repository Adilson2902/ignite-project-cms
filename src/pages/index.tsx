import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Content {
  type: string;
  text: string;
  span: any;
}

interface Post {
  slug?: string;
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    content: Content;
  };
}

interface PostPagination {
  next_page?: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const { results } = props.postsPagination;

  return (
    <>
      <Head>
        <title>Posts | Desafio Ignite</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {results.map(i => {
            return (
              <Link href={`/posts/${i.slug}`} key={i.slug}>
                <a>
                  <strong>{i.data.title}</strong>
                  <p>{i.data.content[0].text || ''}</p>

                  <div className={styles.rowDate}>
                    <div className={styles.rowIcon}>
                      <AiOutlineCalendar
                        style={{ marginRight: 7 }}
                        size={20}
                        color="#BBBBBB"
                      />
                      <time>{i.first_publication_date}</time>
                    </div>
                    <div className={styles.rowIcon}>
                      <AiOutlineUser
                        color="#BBBBBB"
                        style={{ marginRight: 7, marginLeft: 7 }}
                        size={20}
                      />
                      {i.data.author}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post');

  const posts = postsResponse.results.map(i => ({
    slug: i.uid,
    uid: i.uid,
    first_publication_date: new Date(
      i.first_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    data: {
      title: i.data.title,
      subtitle: i.data.subtitle,
      author: i.data.author,
      banner: {},
      content: i.data.content.map(i => i.heading[0]),
    },
  }));

  return {
    props: {
      postsPagination: {
        results: posts,
      },
    },
  };
};
