import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";
import DateComponent from "@/app/components/Date";

type Props = {
  person: {
    firstName: string | null;
    lastName: string | null;
    picture?: any;
  };
  date: string;
};

export default function Avatar({ person, date }: Props) {
  const { firstName, lastName, picture } = person;

  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className="font-bold">
            {firstName} {lastName}
          </div>
        )}
        <div className="text-gray-500 text-sm">
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  );
}
