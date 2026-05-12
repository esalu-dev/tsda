import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { AltasYBajasNumber } from './AltasYBajasNumber'
import { FiCalendar } from 'react-icons/fi'
import { EventType } from '@/schemas/EventType'
import { format } from '@formkit/tempo'

export function EventCard({ event }: { event: EventType }) {
  return (
    <Card
      className="flex h-full w-full snap-center flex-col dark:bg-dark-black"
      shadow="none"
    >
      <CardHeader className="flex h-2 flex-1 flex-col items-center gap-2">
        <span className="text-3xl text-gray-600 dark:text-gray-400">
          <FiCalendar />
        </span>
        <h4 className="text-xl font-bold">{event.title}</h4>
        <p className="w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {event.body}
        </p>
      </CardHeader>
      <CardBody className="flex h-2 flex-1 flex-col items-center overflow-hidden">
        <div className="flex w-full flex-1 flex-row">
          {event.endDate ? (
            <>
              <AltasYBajasNumber
                day={format(event.startDate, 'D')}
                month={format(event.startDate, 'MMMM', 'es')}
                year={format(event.startDate, 'YYYY')}
                state="Inicia"
              />
              <Divider orientation="vertical" />
              <AltasYBajasNumber
                day={format(event.endDate, 'D')}
                month={format(event.endDate, 'MMMM', 'es')}
                year={format(event.endDate, 'YYYY')}
                state="Termina"
              />
            </>
          ) : (
            <AltasYBajasNumber
              day={format(event.startDate, 'D')}
              month={format(event.startDate, 'MMMM', 'es')}
              year={format(event.startDate, 'YYYY')}
            />
          )}
        </div>
      </CardBody>
    </Card>
  )
}
