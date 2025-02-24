/**
 * Safe IP address validation utility
 * This implementation avoids the vulnerable ip package and uses native methods
 */

/**
 * Validates and normalizes an IPv4 address
 */
export function validateIPv4(ip: string): boolean {
  // Remove leading zeros and validate format
  const normalizedIP = ip
    .split(".")
    .map((octet) => parseInt(octet, 10))
    .join(".");

  // Basic format validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(normalizedIP)) {
    return false;
  }

  // Validate each octet
  const octets = normalizedIP.split(".");
  return octets.every((octet) => {
    const num = parseInt(octet, 10);
    return num >= 0 && num <= 255;
  });
}

/**
 * Validates and normalizes an IPv6 address
 */
export function validateIPv6(ip: string): boolean {
  // Remove any leading/trailing spaces and brackets
  const cleanIP = ip.trim().replace(/^\[|\]$/g, "");

  // Basic format validation
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$/;
  if (!ipv6Regex.test(cleanIP)) {
    return false;
  }

  // Split into segments and validate each
  const segments = cleanIP.split(":");
  return segments.every((segment) => {
    const num = parseInt(segment, 16);
    return !isNaN(num) && num >= 0 && num <= 65535;
  });
}

/**
 * Checks if an IP address is private
 */
export function isPrivateIP(ip: string): boolean {
  // IPv4 private ranges
  const ipv4PrivateRanges = [
    ["10.0.0.0", "10.255.255.255"],
    ["172.16.0.0", "172.31.255.255"],
    ["192.168.0.0", "192.168.255.255"],
    ["127.0.0.0", "127.255.255.255"], // Loopback
  ];

  // IPv6 private ranges
  const ipv6PrivateRanges = [
    "fc00::/7", // Unique Local Addresses
    "fe80::/10", // Link Local Addresses
    "::1/128", // Loopback
  ];

  if (validateIPv4(ip)) {
    const ipNum = ip
      .split(".")
      .reduce((sum, octet) => sum * 256 + parseInt(octet, 10), 0);
    return ipv4PrivateRanges.some(([start, end]) => {
      const startNum = start
        .split(".")
        .reduce((sum, octet) => sum * 256 + parseInt(octet, 10), 0);
      const endNum = end
        .split(".")
        .reduce((sum, octet) => sum * 256 + parseInt(octet, 10), 0);
      return ipNum >= startNum && ipNum <= endNum;
    });
  }

  if (validateIPv6(ip)) {
    // For IPv6, we'll check against known private ranges
    const normalizedIP = ip.toLowerCase();
    return ipv6PrivateRanges.some((range) => {
      const [prefix, bits] = range.split("/");
      const prefixLength = parseInt(bits, 10);
      return normalizedIP.startsWith(prefix.slice(0, prefixLength));
    });
  }

  return false;
}

/**
 * Safely validates if an IP address is public
 * This function is more strict than the vulnerable ip package
 */
export function isPublicIP(ip: string): boolean {
  // First validate the IP format
  if (!validateIPv4(ip) && !validateIPv6(ip)) {
    return false;
  }

  // If it's a private IP, it's not public
  if (isPrivateIP(ip)) {
    return false;
  }

  // Additional checks for potentially dangerous IPs
  const dangerousPatterns = [
    /^0\./, // Leading zero octets
    /^127\./, // Loopback
    /^169\.254\./, // Link local
    /^192\.0\.0\./, // IETF Protocol Assignments
    /^192\.0\.2\./, // TEST-NET-1
    /^198\.51\.100\./, // TEST-NET-2
    /^203\.0\.113\./, // TEST-NET-3
    /^224\.0\.0\.0/, // Multicast
    /^240\./, // Reserved for future use
    /^100\.64\./, // Carrier-grade NAT
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(ip));
}

/**
 * Safely processes an IP address for use in the application
 */
export function safeProcessIP(ip: string): string | null {
  // Remove any whitespace and normalize
  const normalizedIP = ip.trim();

  // Validate the IP
  if (!validateIPv4(normalizedIP) && !validateIPv6(normalizedIP)) {
    return null;
  }

  // Only allow public IPs
  if (!isPublicIP(normalizedIP)) {
    return null;
  }

  return normalizedIP;
}
