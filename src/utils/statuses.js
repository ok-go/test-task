export const TO_READ = 'TO_READ';
export const IN_PROGRESS = 'IN_PROGRESS';
export const DONE = 'DONE';

export const nextStatus = {
    [TO_READ]: IN_PROGRESS,
    [IN_PROGRESS]: DONE,
    [DONE]: TO_READ,
}

export const statusLabel = {
    [TO_READ]: 'To read',
    [IN_PROGRESS]: 'In progress',
    [DONE]: 'Done',
}