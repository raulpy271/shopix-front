
import Template from '../../Layouts/Template';
import { Card } from "flowbite-react";
import {getMe} from '@Components/Auth';
import { useEffect, useState } from 'react';

export default function Me() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    (async () => {
      if (!me) {
        const meRes = await getMe();
        console.log(meRes)
        setMe(meRes);
      }
    })();
  }, [me]);
  return (
    <div>
      <Template>
        <div className="flex align-items justify-center">
          <Card href="#" className="max-w-sm">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Página do usuário <span className="text-green-900 dark:text-green-400">{me?.username}</span>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Nome completo: <span className="text-gray-900 dark:text-white">{me?.fullname}</span>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Email: <span className="text-gray-900 dark:text-white">{me?.email}</span>
            </p>
          </Card>
        </div>
      </Template>
    </div>
  )

}
