import { defineEventHandler } from 'h3';
import { EditingRenderMiddleware } from '../../../lib/editing/editing-render-middleware';

export default defineEventHandler(async (event) => {
	const handler = new EditingRenderMiddleware().getHandler();
	return handler(event);
});