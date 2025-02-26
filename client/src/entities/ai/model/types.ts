export interface ModerationPayload {
  title: string;
  description: string;
}

export interface GenerationPayload {
  prompt: string;
}

export interface ApiResponse {
  success: boolean;
}

export interface GenerationsResponse {
  text: string;
}
