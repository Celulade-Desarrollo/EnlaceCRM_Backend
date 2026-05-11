export class UserScoringData {
  constructor({
    request_id,
    client,
    business,
    credit_request,
    payment_behavior,
    metadata
  }) {
    this.request_id = request_id || `req-${Date.now()}`;
    this.client = {
      document_id: client.document_id,
      document_type: client.document_type || "CC",
      age: client.age,
      city: client.city,
      neighborhood: client.neighborhood,
      socioeconomic_level: client.socioeconomic_level,
      legal_nature: client.legal_nature || "natural",
      geo: {
        x: client.geo?.x || 0,
        y: client.geo?.y || 0
      }
    };
    this.business = {
      monthly_sales: business.monthly_sales || 0,
      refrigerator_count: business.refrigerator_count || 0
    };
    this.credit_request = {
      requested_amount: `${credit_request.requested_amount}` || 0,
      currency: credit_request.currency || "COP"
    };
    this.payment_behavior = {
      movements: payment_behavior.movements || [],
      payment_terms: payment_behavior.payment_terms || {
        same_day_days: 0,
        term_1_to_15_days_min: 1,
        term_1_to_15_days_max: 15,
        term_16_to_30_days_min: 16,
        term_16_to_30_days_max: 30
      }
    };
    this.metadata = {
      source_system: metadata?.source_system || "backend_core",
      scoring_version: metadata?.scoring_version || "v2"
    };
  }
}
