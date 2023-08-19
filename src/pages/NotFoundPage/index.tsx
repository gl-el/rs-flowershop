import s from './NotFoundPage.module.scss';
import { Typography } from '../../components/UI/Typography';

function NotFoundPage() {
  return (
    <main>
      <div className={s.grid}>
        <div className={s.content}>
          <div className={s.wrapper}>
            <Typography variant={'overline'} className={s.overline}>
              404 error
            </Typography>
            <Typography variant={'h2'} className={s.h2}>
              Page not found
            </Typography>
            <Typography variant={'body'}>
              Sorry, the page you are looking for doesn`t exist or has been moved.<br></br>
              Came back to the main page — there is still a lot of interesting and beautiful.
            </Typography>
          </div>
        </div>
        <div className={s.imageBlock}></div>
      </div>
    </main>
  );
}

export default NotFoundPage;
