import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/api',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello API' };
    }
  );

  fastify.post(
    '/api/send',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Data sent successfully.' };
    }
  );

  fastify.post(
    '/api/send-error',
    async function (request: FastifyRequest, reply: FastifyReply) {
      reply.code(400);
      return { message: 'Error sending data.' };
    }
  );
}
