'use client';
import TimePicker from './TimePicker';

const TimePickerDeme = () => (
  <div className='mx-auto mt-24 grid max-w-lg grid-cols-2 gap-8'>
    <span>default</span>
    <TimePicker />
    <span>disabled</span>
    <TimePicker disabled={true} />
    <h3 className='col-span-2 border-b-2 text-lg uppercase'> status</h3>
    <span>warn</span>
    <TimePicker status='warn' />
    <span>error</span>
    <TimePicker status='error' />

    <h3 className='col-span-2 border-b-2 text-lg uppercase'> size</h3>
    <span>sm</span>
    <TimePicker size='sm' />
    <span>lg</span>
    <TimePicker size='lg' />
    <h3 className='col-span-2 border-b-2 text-lg uppercase'>hour steps</h3>
    <span>hour step: 3</span>
    <TimePicker hourStep={3} />
    <h3 className='col-span-2 border-b-2 text-lg uppercase'>min steps</h3>
    <span>minute step: 5</span>
    <TimePicker minuteStep={5} />
  </div>
);

export default TimePickerDeme;
