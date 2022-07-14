import { Injectable } from '@nestjs/common';
import { BulkActionsProvider } from 'src/modules/bulk-actions/providers/bulk-actions.provider';
import { CreateBulkActionDto } from 'src/modules/bulk-actions/dto/create-bulk-action.dto';
import { BulkActionIdDto } from 'src/modules/bulk-actions/dto/bulk-action-id.dto';
import { Socket } from 'socket.io';

@Injectable()
export class BulkActionsService {
  constructor(
    private readonly bulkActionsProvider: BulkActionsProvider,
  ) {}

  async create(dto: CreateBulkActionDto, socket: Socket) {
    const bulkAction = await this.bulkActionsProvider.create(dto, socket);
    return bulkAction.getOverview();
  }

  async get(dto: BulkActionIdDto) {
    const bulkAction = await this.bulkActionsProvider.get(dto.id);
    return bulkAction.getOverview();
  }

  async abort(dto: BulkActionIdDto) {
    const bulkAction = await this.bulkActionsProvider.abort(dto.id);
    return bulkAction.getOverview();
  }

  disconnect(socketId: string) {
    this.bulkActionsProvider.abortUsersBulkActions(socketId);
  }
}
