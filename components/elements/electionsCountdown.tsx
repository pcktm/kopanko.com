import {polishPlurals} from 'polish-plurals';
import {useEffect, useState} from 'react';

const DEALINE_DATE = new Date('2023-10-12T00:00:00.000Z');

const calculateTimeLeft = () => {
  const difference = +DEALINE_DATE - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    };
  }

  // eslint-disable-next-line max-len
  const string = `${timeLeft.days} ${polishPlurals('dzień', 'dni', 'dni', timeLeft.days)} i ${timeLeft.hours} ${polishPlurals('godzina', 'godziny', 'godzin', timeLeft.hours)}`;

  return {
    ...timeLeft,
    string,
  };
};

export default function ElectionCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="notification is-danger">
      {
          timeLeft.days === 0
            ? 'Tutaj był licznik ale już za późno na zmiany, mam nadzieję że oddaliście głos!'
            : (
              <>
                Możesz złożyć wniosek jeszcze przez
                <strong>
                  {' '}
                  {timeLeft.string}
                </strong>
                , ale nie zostawiaj tego na ostatnią chwilę –
                {' '}
                <em>zrób to teraz!</em>
              </>
            )
        }
    </div>
  );
}
