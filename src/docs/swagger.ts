import dotenv from 'dotenv'
import { address } from 'ip'

dotenv.config()

export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'A simple Node.js application with TypeScript',
    description: 'REST API for application services.'
  },
  host: `${address()}:${process.env.PORT}`,
  basePath: '',
  tags: [
    {
      name: 'Auth',
      description: 'Endpoint for authentication.'
    },
    {
      name: 'Users',
      description: 'Endpoint for operations in users.'
    }
  ],
  schemes: [
    'http'
  ],
  securityDefinitions: {
    'API-Key': {
      description: 'A Bearer or X-Access-Token is required for authentication and authorization.',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    {
      'API-Key': []
    }
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  paths: {
    '/auth': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Authenticate user.',
        parameters: [
          {
            in: 'body',
            name: 'User',
            description: 'Email and password required.',
            schema: {
              $ref: '#/definitions/Login'
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: 'A authentication token.'
          },
          400: {
            description: 'Failed. Bad request.'
          },
          401: {
            description: 'Incorret email or password.'
          },
          default: {
            description: 'Unexpected error.'
          }
        }
      }
    },
    '/users': {
      get: {
        tags: [
          'Users'
        ],
        summary: 'Returns registered users.',
        responses: {
          200: {
            description: 'A list of users. Obs: Password will not be returned. Creation and update date will be returned.',
            schema: {
              $ref: '#/definitions/Users'
            }
          },
          400: {
            description: 'Failed. Bad request.'
          },
          401: {
            description: 'Authentication failed.'
          },
          403: {
            description: 'Permission denied.'
          },
          default: {
            description: 'Unexpected error.'
          }
        }
      },
      post: {
        tags: [
          'Users'
        ],
        summary: 'Add a new user.',
        parameters: [
          {
            in: 'body',
            name: 'User',
            description: 'User data. All fields required.',
            schema: {
              $ref: '#/definitions/User'
            },
            required: true
          }
        ],
        responses: {
          201: {
            description: 'Successful registration.'
          },
          400: {
            description: 'Failed. Bad request.'
          },
          401: {
            description: 'Authentication failed.'
          },
          403: {
            description: 'Permission denied.'
          },
          default: {
            description: 'Unexpected error.'
          }
        }
      }
    },
    '/users/{userId}': {
      put: {
        tags: [
          'Users'
        ],
        summary: 'Update a user by ID.',
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'User',
            description: "New user data. It's not necessary to send all fields.",
            schema: {
              $ref: '#/definitions/User'
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: 'Successful update.'
          },
          400: {
            description: 'Failed. Bad request.'
          },
          401: {
            description: 'Authentication failed.'
          },
          403: {
            description: 'Permission denied.'
          },
          default: {
            description: 'Unexpected error.'
          }
        }
      },
      delete: {
        tags: [
          'Users'
        ],
        summary: 'Delete a user by ID.',
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Successful deletion.'
          },
          400: {
            description: 'Failed. Bad request.'
          },
          401: {
            description: 'Authentication failed.'
          },
          403: {
            description: 'Permission denied.'
          },
          default: {
            description: 'Unexpected error.'
          }
        }
      }
    }
  },
  definitions: {
    Login: {
      type: 'object',
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string',
          format: 'password'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        password: {
          type: 'string',
          format: 'password'
        },
        role: {
          type: 'string',
          enum: [
            'admin',
            'user'
          ]
        }
      }
    },
    Users: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            $ref: '#/definitions/User'
          }
        }
      }
    }
  }
}
