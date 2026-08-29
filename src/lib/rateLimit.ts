interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  identifier: string,
  options: { maxRequests: number; windowMs: number } = {
    maxRequests: 5,
    windowMs: 10 * 60 * 1000, // 10 minutes
  }
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - 1,
      reset: Math.ceil((now + options.windowMs) / 1000),
    };
  }

  if (record.count >= options.maxRequests) {
    return {
      success: false,
      limit: options.maxRequests,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: options.maxRequests,
    remaining: options.maxRequests - record.count,
    reset: Math.ceil(record.resetTime / 1000),
  };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const cfConnecting = req.headers.get("cf-connecting-ip");
  if (cfConnecting) {
    return cfConnecting.trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
