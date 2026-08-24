const { z } = require('zod');

const AccountCard = z.object({
    name: z.string().trim().min(1, 'Account cannot be empty'),
    username: z.string().trim().optional(),
    category: z.enum([
        'social','email', 'banking','finance', 'work', 'school', 'subscription','other'
    ]).optional(),
    websiteUrl: z.string().trim().url('Website url must be valid').optional().or(z.literal('')),
    notes: z.string().trim().max(1000, 'Notes cannot exceed 1000 words').optional(),
    status: z.enum(['active','expired','archived']).optional(),
    renewalDate: z.coerce.date().optional().nullable(),
    expirationDate: z.coerce.date().optional().nullable()
}).strict();

const updateAccountSchema = AccountCard.partial();
const createAccountSchema = AccountCard;

module.exports ={ updateAccountSchema, createAccountSchema };