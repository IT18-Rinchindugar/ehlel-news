import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from './article.module.css';
import Layout from '../../../components/Layout';
import dynamic from 'next/dynamic';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function ArticleCreate() {
  const Editor = dynamic(() => import("../../../components/RichTextEditor"), { ssr: false });
  const router = useRouter();
  const [data, setData] = useState({
    tag: 'Улс төр',
  });
  function onChange(e) {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value, // title: "Rinchindugar"
    });
  }

  function submit() {
    axios.post(`${BACKEND_URL}/posts`, data).then(() => {
      toast.success('Амжилттай хадгалсан!!', {
        hideProgressBar: true,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
      router.push('/admin/articles');
    });
  }

  return (
    <section className="mt-5">
      <h3 className={styles.create__header}>Нийтлэл нэмэх</h3>
      <form>
        <section
          className={`${styles.create__container} bg-white rounded-lg mt-3 mr-5 p-6`}
        >
          {/* 1px solid #CBD5E1 */}
          <section className="flex flex-row items-center justify-between w-full">
            <p>Гарчиг</p>
            <input
              name="title"
              onChange={onChange}
              className={`${styles.create__input_text} border border-[#CBD5E1] w-2/3 outline-none px-3 py-1 rounded`}
            />
          </section>
          <section className="flex flex-row justify-between w-full mt-5">
            <p>Агуулга</p>
            <textarea
              cols="50"
              name="description"
              onChange={onChange}
              className={`${styles.create__input_text} border border-[#CBD5E1] w-2/3 outline-none px-3 py-1 rounded`}
            />
          </section>
          <section className="flex flex-col w-full mt-5">
            <p>Контент</p>
            <Editor onChange={richData => {
              setData({
                ...data,
                'content': richData,
              });
            }} />
          </section>
          <section className="flex flex-row items-center justify-between w-full mt-5">
            <p>Таг</p>
            <div className="w-2/3">
              <section className="border border-[#CBD5E1] w-2/3 outline-none px-2 py-1 rounded">
                <select
                  name="tag"
                  className="w-full border-none outline-none"
                  onChange={onChange}
                >
                  <option selected value="Улс төр">
                    Улс төр
                  </option>
                  <option value="Нийгэм">Нийгэм</option>
                  <option value="Спорт">Спорт</option>
                  <option value="Технологи">Технологи</option>
                </select>
              </section>
            </div>
          </section>
          <section className="flex flex-row items-center justify-between w-full mt-5">
            <p>Зураг</p>
            <input
              type="url"
              name="image"
              onChange={onChange}
              className={`${styles.create__input_text} border border-[#CBD5E1] w-2/3 outline-none px-3 py-1 rounded`}
            />
          </section>
          <section className="flex justify-between mt-5 items-center">
            <p>Статус</p>
            <section className="w-2/3">
              <section className="border border-[#CBD5E1] w-2/3 outline-none px-2 py-1 rounded">
                <select
                  name="status"
                  value={data.status}
                  className="w-full border-none outline-none"
                  onChange={onChange}
                >
                  <option value="published">Нийтлэх</option>
                  <option value="unpublished">Нийтлэхгүй</option>
                </select>
              </section>
            </section>
          </section>
        </section>
        <button type="button" onClick={submit} className="btn mt-10">
          Хадгалах
        </button>
      </form>
    </section>
  );
}

ArticleCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default ArticleCreate;
