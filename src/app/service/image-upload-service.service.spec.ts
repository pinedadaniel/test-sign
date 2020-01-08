import { TestBed } from '@angular/core/testing';

import { ImageUploadServiceService } from './image-upload-service.service';

describe('ImageUploadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageUploadServiceService = TestBed.get(ImageUploadServiceService);
    expect(service).toBeTruthy();
  });
});
