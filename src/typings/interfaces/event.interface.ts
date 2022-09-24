import {modeType} from '../types';

export type eventId = string | number;

export interface eventInterface {
  id: eventId;
  title?: string;
  time: { start: string; end: string }; // YYYY-MM-DD hh:mm
  description?: string;
  topic?: string;
  location?: string; // Name of the event location
  with?: string; // Names of people
  colorScheme?: string;
  color?: "blue" | "yellow" | "green" | "red"; // Says 'color', but represents CSS-Property background-color
  isEditable?: boolean; // If true, the event has delete- and edit icons in Event-Flyout. Can also be dragged and dropped.
  disableDnD?: true | modeType[]; // Disable Drag and Drop for this event, in the modes specified, if true disable for all modes
  disableResize?: true | modeType[]; // Disable Resize for this event, in the modes specified, if true disable for all modes
  isCustom?: boolean; // If true, the event expects to be displayed using the event slot

  // These are properties that should never be fed into the editor
  // Instead, they are assigned to events, in order to for example position/style them correctly
  zIndex?: number;
  nOfPreviousConcurrentEvents?: number;
  totalConcurrentEvents?: number;
  timeJS?: { start: Date, end: Date }
}
