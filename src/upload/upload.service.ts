import { BadRequestException, Injectable } from '@nestjs/common';
import { supabase } from 'src/lib/supabase';

@Injectable()
export class UploadService {

 public async create(file: any): Promise<string> {
    if (!file) throw new BadRequestException('No image provided');

    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from('gov-id-tracker')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new BadRequestException(error.message);

    const { data } = supabase.storage.from('gov-id-tracker').getPublicUrl(fileName);

    return data.publicUrl;
  }


}
